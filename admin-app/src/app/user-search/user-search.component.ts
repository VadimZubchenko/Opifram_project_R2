import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { User } from '../common/models/user';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  @Output() userSearch = new EventEmitter<Observable<User[]>>();
  searchTerms = new Subject<string>();

  onSearch(term: string): void {
    this.searchTerms.next(term.trim());
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userSearch.emit(this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchUsers(term))
    ));
  }

}
