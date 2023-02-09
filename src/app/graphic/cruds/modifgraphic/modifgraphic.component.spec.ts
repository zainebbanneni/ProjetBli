import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifgraphicComponent } from './modifgraphic.component';

describe('ModifgraphicComponent', () => {
  let component: ModifgraphicComponent;
  let fixture: ComponentFixture<ModifgraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifgraphicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifgraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
