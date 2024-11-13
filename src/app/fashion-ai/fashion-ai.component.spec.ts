import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionAiComponent } from './fashion-ai.component';

describe('FashionAiComponent', () => {
  let component: FashionAiComponent;
  let fixture: ComponentFixture<FashionAiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FashionAiComponent]
    });
    fixture = TestBed.createComponent(FashionAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
