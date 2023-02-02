import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardProducteurComponent } from './board-producteur.component';

describe('BoardProducteurComponent', () => {
  let component: BoardProducteurComponent;
  let fixture: ComponentFixture<BoardProducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardProducteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardProducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
