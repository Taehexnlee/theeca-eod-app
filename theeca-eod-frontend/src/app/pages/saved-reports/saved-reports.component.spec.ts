import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedReportsComponent } from './saved-reports.component';

describe('SavedReportsComponent', () => {
  let component: SavedReportsComponent;
  let fixture: ComponentFixture<SavedReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
