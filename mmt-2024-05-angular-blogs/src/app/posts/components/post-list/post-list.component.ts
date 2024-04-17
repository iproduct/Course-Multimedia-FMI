import { Component, OnInit, HostBinding } from '@angular/core';
import { Post } from '../../model/post-model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../posts.service';
import { slideInDownAnimation } from '../../../shared/animations';
import { MessageService } from '../../../core/message.service';

@Component({
  selector: 'bl-post-list',
  animations: [ slideInDownAnimation ],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  posts: Post[] = [];
  selectedPost: Post | undefined;
  currentMode = 'present';
  messages: string | undefined;
  errors: string | undefined;

  constructor(private service: PostsService, private messageService: MessageService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(qparams => {
      if (qparams['refresh']) {
        this.refresh();
      }
    });
    this.refresh();
  }

  selectPost(post: Post) {
    this.selectedPost = post;
    // this.router.navigate([PRODUCTS_ROUTE, this.currentMode, post.id]);
  }

  setMode(mode: string) {
    this.currentMode = mode;
  }

  onAddPost() {
    this.setMode('edit');
    // this.selectedPost = new Post(undefined, undefined);
    this.router.navigate(['posts', 'create']);
  }

  onDeletePost(post: Post) {
    this.service.deleteById(post.id)
      .subscribe(
        deleted => {
          const index = this.posts.findIndex(p => p.id === deleted.id);
          this.posts.splice(index, 1);
          this.showMessage(`Post ${deleted.title} was successfully deleted.`);
        },
        err => this.showError(err)
      );
  }

  onPostModified(post: Post) {
    if (post.id) { // edit mode
      this.service.update(post).subscribe(
        updated => {
          const index = this.posts.findIndex(p => p.id === updated.id);
          this.posts[index] = updated;
          this.showMessage(`Post '${updated.title}' updated successfully.`);
        },
        err => this.showError(err)
      );
    } else {
      this.service.create(post).subscribe(
        created => {
          this.posts.push(created);
          this.showMessage(`Post '${created.title}' created successfully.`);
        },
        err => this.showError(err)
      );
    }
  }

  onPostCanceled() {
    // this.selectPost(undefined);
  }

  private refresh() {
    this.service.findAll()
      .subscribe(
        posts => this.posts = posts,
        err => this.showError(err));
  }

  private showMessage(msg: string) {
    this.messageService.success(msg);
  }

  private showError(err: string) {
    this.messageService.error(err);
  }

}
