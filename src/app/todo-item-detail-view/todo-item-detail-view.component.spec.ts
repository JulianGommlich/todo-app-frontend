import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemDetailViewComponent } from './todo-item-detail-view.component';

describe('TodoItemDetailViewComponent', () => {
  let component: TodoItemDetailViewComponent;
  let fixture: ComponentFixture<TodoItemDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoItemDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
