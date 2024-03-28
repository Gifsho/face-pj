import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChnameComponent } from './chname.component';

describe('ChnameComponent', () => {
  let component: ChnameComponent;
  let fixture: ComponentFixture<ChnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChnameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
