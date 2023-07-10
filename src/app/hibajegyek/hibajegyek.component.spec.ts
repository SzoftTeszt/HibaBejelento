import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HibajegyekComponent } from './hibajegyek.component';

describe('HibajegyekComponent', () => {
  let component: HibajegyekComponent;
  let fixture: ComponentFixture<HibajegyekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HibajegyekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HibajegyekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
