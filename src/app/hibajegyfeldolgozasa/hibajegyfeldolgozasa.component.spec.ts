import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HibajegyfeldolgozasaComponent } from './hibajegyfeldolgozasa.component';

describe('HibajegyfeldolgozasaComponent', () => {
  let component: HibajegyfeldolgozasaComponent;
  let fixture: ComponentFixture<HibajegyfeldolgozasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HibajegyfeldolgozasaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HibajegyfeldolgozasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
