import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListDetailViewComponent } from './todo-list-detail-view.component';

describe('TodoListDetailViewComponent', () => {
  let component: TodoListDetailViewComponent;
  let fixture: ComponentFixture<TodoListDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
