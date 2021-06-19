import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchngPageComponent } from './matchng-page.component';

describe('MatchngPageComponent', () => {
  let component: MatchngPageComponent;
  let fixture: ComponentFixture<MatchngPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchngPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchngPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
