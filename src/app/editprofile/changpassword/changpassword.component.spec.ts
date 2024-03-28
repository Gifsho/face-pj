import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangpasswordComponent } from './changpassword.component';

describe('ChangpasswordComponent', () => {
  let component: ChangpasswordComponent;
  let fixture: ComponentFixture<ChangpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangpasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
