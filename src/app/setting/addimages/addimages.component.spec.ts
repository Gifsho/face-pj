import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddimagesComponent } from './addimages.component';

describe('AddimagesComponent', () => {
  let component: AddimagesComponent;
  let fixture: ComponentFixture<AddimagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddimagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
