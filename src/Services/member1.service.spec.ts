import { TestBed } from '@angular/core/testing';

import { Member1Service } from './member1.service';

describe('Member1Service', () => {
  let service: Member1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Member1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
