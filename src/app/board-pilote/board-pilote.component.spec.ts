import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPiloteComponent } from './board-pilote.component';

describe('BoardPiloteComponent', () => {
  let component: BoardPiloteComponent;
  let fixture: ComponentFixture<BoardPiloteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardPiloteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardPiloteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
