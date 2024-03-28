import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChAvatarimgComponent } from './ch-avatarimg.component';

describe('ChAvatarimgComponent', () => {
  let component: ChAvatarimgComponent;
  let fixture: ComponentFixture<ChAvatarimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChAvatarimgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChAvatarimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
