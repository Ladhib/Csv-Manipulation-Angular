import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManMatchingDialogComponent } from './man-matching-dialog.component';

describe('ManMatchingDialogComponent', () => {
  let component: ManMatchingDialogComponent;
  let fixture: ComponentFixture<ManMatchingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManMatchingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManMatchingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
