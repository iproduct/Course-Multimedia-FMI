import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../model/post-model';
import { MessageService } from '../../../core/message.service';
import { PostsService } from '../../services/posts.service';
import { DialogService } from '../../../core/dialog.service';
import { shallowEquals } from '../../../shared/utils';

@Component({
  selector: 'bp-post-detail',
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

  form: FormGroup = this.buildForm();

  private statusSubscription: Subscription | undefined;

  formErrors = {
    title: '',
    content: '',
    imageUrl: ''
  };

  validationMessages = {
    title: {
      required: 'Post name is required.',
      minlength: 'Postname must be at least 2 characters long.',
      maxlength: 'Postname cannot be more than 24 characters long.'
    },
    content: {
      minlength: 'Description must be at least 2 characters long.',
      maxlength: 'Description cannot be more than 512 characters long.'
    },
    imageUrl: {
      pattern: 'Image URL should be valid (ex. http://example.com/image/path.jpeg).'
    }
  };

  constructor(private fb: FormBuilder, private postsService: PostsService, private messageService: MessageService,
              private dialogService: DialogService) { }

  ngOnInit() {
    // this.route.data
    // .subscribe(
    //   (data: { post?: Post, title?: string, mode?: string }) => {
    //     this.title = data.title || this.title;
    //     this.mode = data.mode || this.mode;
    //     const post = data.post;
    //     if (post) {
    //       this.post = post;
    //       this.reset();
    //     }
    //   },
    //   err => this.messageService.error(err)
    // );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const postChange = changes['post'];
    if (postChange && postChange.currentValue !== postChange.previousValue) {
      this.reset();
    }
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

  buildForm() {
    return this.fb.group({
      id: {value: this.post.id, disabled: true},
      title: [this.post.title,
        [Validators.required, Validators.minLength(2), Validators.maxLength(60)]
      ],
      content: [this.post.content,
        [Validators.required, Validators.minLength(2), Validators.maxLength(1024)]
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
    this.post = this.form.getRawValue();
    const submittedPost =  this.form.getRawValue();
    if(submittedPost.id === 0) {
      submittedPost.id = undefined;
    }
    this.postModified.emit(submittedPost);
    this.reset();
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
