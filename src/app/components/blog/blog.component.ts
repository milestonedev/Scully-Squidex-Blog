import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post.model';
import { ContentBackendService } from 'src/app/services/content-backend.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: Observable<Post[]>;
  constructor(private contentService: ContentBackendService) { }

  ngOnInit(): void {
    this.posts = this.contentService.getPosts();
  }

}
