import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToptennullComponent } from './toptennull.component';

describe('ToptennullComponent', () => {
  let component: ToptennullComponent;
  let fixture: ComponentFixture<ToptennullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToptennullComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToptennullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
