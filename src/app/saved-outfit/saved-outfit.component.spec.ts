import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedOutfitComponent } from './saved-outfit.component';

describe('SavedOutfitComponent', () => {
  let component: SavedOutfitComponent;
  let fixture: ComponentFixture<SavedOutfitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedOutfitComponent]
    });
    fixture = TestBed.createComponent(SavedOutfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
