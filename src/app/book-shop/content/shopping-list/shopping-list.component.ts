import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  param: any;
  constructor(private route: ActivatedRoute) {
    this.param = this.route.snapshot.params.order;
    console.log(this.param);
  }

  ngOnInit(): void {}
}
