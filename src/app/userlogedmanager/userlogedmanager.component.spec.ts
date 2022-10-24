import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlogedmanagerComponent } from './userlogedmanager.component';

describe('UserlogedmanagerComponent', () => {
  let component: UserlogedmanagerComponent;
  let fixture: ComponentFixture<UserlogedmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserlogedmanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserlogedmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
