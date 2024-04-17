import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../model/post-model';
import { MessageService } from '../../../core/message.service';
import { PostsService } from '../../posts.service';
import { DialogService } from '../../../core/dialog.service';
import { shallowEquals } from '../../../shared/utils';

@Component({
  selector: 'ws-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() mode = 'present';
  @Input() post: Post = new Post('', '', 1, Date.now(), [], '');
  @Output() postModified = new EventEmitter<Post>();
  @Output() postCanceled = new EventEmitter<void>();
  title = 'Post Details';
  isCanceled = false;

  get isNewPost() {
    return !this.post || !this.post.id;
  }
  form: FormGroup | undefined;
  private statusSubscription: Subscription | undefined;

  formErrors = {
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  };

  validationMessages = {
    name: {
      required: 'Post name is required.',
      minlength: 'Postname must be at least 2 characters long.',
      maxlength: 'Postname cannot be more than 24 characters long.'
    },
    price: {
      required: 'Price is required.',
      min: 'Price should be positive number.'
    },
    description: {
      minlength: 'Description must be at least 2 characters long.',
      maxlength: 'Description cannot be more than 512 characters long.'
    },
    imageUrl: {
      pattern: 'Image URL should be valid (ex. http://example.com/image/path.jpeg).'
    }
  };

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
              private messageService: MessageService, private postsService: PostsService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.route.data
    .subscribe(
      (data: { post?: Post, title?: string, mode?: string }) => {
        this.title = data.title || this.title;
        this.mode = data.mode || this.mode;
        const post = data.post;
        if (post) {
          this.post = post;
          this.reset();
        }
      },
      err => this.messageService.error(err)
    );
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const prodChange = changes['post'];
    if (prodChange && prodChange.currentValue !== prodChange.previousValue) {
      this.reset();
    }
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      id: {value: this.post.id, disabled: true},
      name: [this.post.title,
        [Validators.required, Validators.minLength(2), Validators.maxLength(24)]
      ],
      description: [this.post.content,
        [Validators.required, Validators.minLength(2), Validators.maxLength(512)]
      ],
      imageUrl: [this.post.imageUrl,
        [
          Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i)
        ]
      ]
    });
    this.statusSubscription = this.form.statusChanges.subscribe(() => this.onStatusChanged());
  }

  submitPost() {
    this.post = this.form?.getRawValue();
    this.postModified.emit(this.post);
    this.reset();
    if (this.isNewPost) { // edit mode
      this.postsService.create(this.post).subscribe(
        created => {
          this.messageService.success(`Post '${created.title}' created successfully.`);
          // window.history.back();
          // this.router.navigate([PRODUCTS_ROUTE], { queryParams: {refresh: true} });
        },
        err => this.messageService.error(err)
      );
    } else {
      this.postsService.update(this.post).subscribe(
        updated => {
          this.messageService.success(`Post '${updated.title}' updated successfully.`);
          // this.router.navigate([PRODUCTS_ROUTE], { queryParams: {refresh: true} });
        },
        err => this.messageService.error(err)
      );
    }
  }

  reset() {
    if ( this.form && this.post) {
      this.form.reset(this.post);
    }
  }
  cancelPost() {
    this.postCanceled.emit();
    this.isCanceled = true;
    // this.router.navigate([PRODUCTS_ROUTE]);
  }

  public canDeactivate(): Observable<boolean> | boolean {
    // Allow navigation if no user or the user data is not changed
    // tslint:disable-next-line:prefer-const
    let rawFormPost = this.form?.getRawValue() as Post;
    // delete rawFormPost.id;
    const {id, ...prod_without_id} = this.post;
    if (this.isCanceled || shallowEquals(prod_without_id, rawFormPost)) {
      return true;
    }
    // Otherwise ask the user to confirm loosing changes using the dialog service
    return this.dialogService.confirm('Discard changes?');
  }

  protected onStatusChanged() {
    if (!this.form) { return; }
    const form = this.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      // this.formErrors[field] = '';
      const control = form.get(field);

      if (control && (control.dirty || control.touched) && control.invalid) {
        // const messages = this.validationMessages[field];
        for (const key in control.errors) {
          // this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
