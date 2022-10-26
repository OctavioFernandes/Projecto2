import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoproductComponent } from './infoproduct.component';

describe('InfoproductComponent', () => {
  let component: InfoproductComponent;
  let fixture: ComponentFixture<InfoproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
