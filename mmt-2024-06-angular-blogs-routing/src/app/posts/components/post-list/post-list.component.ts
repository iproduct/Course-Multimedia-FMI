import { Component, OnInit, HostBinding } from '@angular/core';
import { Post } from '../../model/post-model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { slideInDownAnimation } from '../../../shared/animations';
import { MessageService } from '../../../core/message.service';

export const POSTS_ROUTE = 'posts';
export const MODE_PRESENT = 'present';
export const MODE_EDIT = 'edit';
export const REFRESH = 'refresh';

@Component({
  selector: 'bp-post-list',
  animations: [slideInDownAnimation],
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

  constructor(private service: PostsService, private messageService: MessageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(qparams => {
      if (qparams[REFRESH]) {
        this.refresh();
      }
    });
    this.refresh();
  }

  selectPost(post: Post | undefined) {
    // this.selectedPost = post;
    if (post) {
      this.router.navigate([POSTS_ROUTE, post.id]);
    } else {
      this.router.navigate([POSTS_ROUTE]);
    }
  }

  editPost(post: Post, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate([POSTS_ROUTE, post.id, MODE_EDIT]);
  }


  setMode(mode: string) {
    this.currentMode = mode;
  }

  onAddPost() {
    this.setMode('edit');
    this.selectedPost = new Post('', '', 1, Date.now(), [], '');
    // this.router.navigate(['posts', 'create']);
  }

  deletePost(post: Post) {
    this.service.deleteById(post.id!)
      .subscribe({
        next: deleted => {
          this.posts = this.posts.filter(p => p.id !== deleted.id);
          this.showMessage(`Post '${deleted.title}' was successfully deleted.`);
        },
        error: err => this.showError(err)
      });
  }

  onPostModified(post: Post) {
    if (post.id) { // edit mode
      this.service.update(post).subscribe({
        next: updated => {
          this.posts = this.posts.map(p => p.id === updated.id ? updated : p)
          this.showMessage(`Post '${updated.title}' updated successfully.`);
        },
        error: err => this.showError(err)
      });
    } else {
      this.service.create(post).subscribe({
        next: created => {
          this.posts = this.posts.concat(created);
          this.showMessage(`Post '${created.title}' created successfully.`);
        },
        error: err => this.showError(err)
      });
    }
  }

  onPostCanceled() {
    this.selectPost(undefined);
  }

  private refresh() {
    this.service.findAll()
      .subscribe({
        next: posts => this.posts = posts,
        error: err => this.showError(err)
      });
  }

  private showMessage(msg: string) {
    this.messageService.success(msg);
  }

  private showError(err: string) {
    this.messageService.error(err);
  }

}
