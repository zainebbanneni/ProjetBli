import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDirectionComponent } from './board-direction.component';

describe('BoardDirectionComponent', () => {
  let component: BoardDirectionComponent;
  let fixture: ComponentFixture<BoardDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardDirectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
