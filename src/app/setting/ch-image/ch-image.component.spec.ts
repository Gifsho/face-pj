import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChImageComponent } from './ch-image.component';

describe('ChImageComponent', () => {
  let component: ChImageComponent;
  let fixture: ComponentFixture<ChImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
