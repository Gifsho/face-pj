import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditimagesComponent } from './editimages.component';

describe('EditimagesComponent', () => {
  let component: EditimagesComponent;
  let fixture: ComponentFixture<EditimagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditimagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
