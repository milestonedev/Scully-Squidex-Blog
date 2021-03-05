import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post.model';
import { ContentBackendService } from 'src/app/services/content-backend.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  postSlug:string;
title: string;
body: string;
  constructor(private contentService: ContentBackendService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
this.postSlug = this.route.snapshot.paramMap.get("postSlug");

    this.contentService.getContentBySlug(this.postSlug).subscribe(
      result => {
        const post:Post = result;
        this.body = post.data.body.iv;
        this.title = post.data.title.iv;
      }
    );
  }

}
