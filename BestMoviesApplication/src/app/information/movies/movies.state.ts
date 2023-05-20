import {Movie} from "../../../model/movie";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {
  MoviesFetchInfo, MoviesFetchNextPage,
  MoviesReset, MoviesSearchReset, MoviesSearchTitle
} from "./movies.actions";
import {produce} from "immer";
import {moviesMock} from "../../../util/mocks/movies_mock";
import {NbToastrService} from "@nebular/theme";
import {paginate} from "src/core/helpers/helpers";
import {MoviesService} from "src/api/movies/movies.service";

export interface MoviesStateModel {
  isFetching: boolean;
  isFiltered: boolean;
  allMovies: Movie[];
  moviesDisplayed: Movie[];
  pageSize: number;
  pageToLoadNext: number;
}

export const defaultsState: MoviesStateModel = {
  isFetching: false,
  isFiltered: false,
  allMovies: [],
  moviesDisplayed: [],
  pageSize: 5,
  pageToLoadNext: 1,
}

@State<MoviesStateModel>({
  name: 'moviesPage',
  defaults: defaultsState,
})

@Injectable()
export class MoviesState {
  allMovies: Movie[] = [];
  initialPageSize: number;
  initialPageToLoadNext: number;

  constructor(
    private toastrService: NbToastrService,
    private moviesService: MoviesService,
  ) {
  }

  @Action(MoviesFetchInfo)
  async moviesFetchInfo(
    {getState, setState}: StateContext<MoviesStateModel>) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
      this.initialPageSize = draft.pageSize;
      this.initialPageToLoadNext = draft.pageToLoadNext;
    })

    setState(newState);
    currentState = newState;

    // here we will call the API, but for now we have the mocks
    //TODO implement api call
    try {
      this.allMovies = moviesMock;
    } catch (e) {
      this.toastrService.show('danger', 'Fetching movies went wrong.');

    }

    newState = produce(currentState, draft => {
      draft.isFetching = false;
      //TODO instead of equal it with mocks, use the apis response
      draft.allMovies = this.allMovies;
      draft.moviesDisplayed = paginate(this.allMovies, draft.pageSize, draft.pageToLoadNext);
    })

    setState(newState);
  }

  @Action(MoviesFetchNextPage)
  async moviesFetchNextPage(
    {getState, setState}: StateContext<MoviesStateModel>,
    action: MoviesFetchNextPage) {

    let currentState = getState();

    let pageSize, pageToLoadNext;
    let newState = produce(currentState, draft => {
      draft.isFetching = true;
      pageToLoadNext = draft.pageToLoadNext;
      pageSize = draft.pageSize;
    })

    setState(newState);
    currentState = newState;


    let moviesToDisplayNext: Movie[] = [];
    try {
      pageToLoadNext++;
      moviesToDisplayNext = paginate(this.allMovies, pageSize, pageToLoadNext);
    } catch (e) {
      this.toastrService.show('danger', 'Fetching next movies went wrong.');

    }

    newState = produce(currentState, draft => {
      //TODO instead of equal it with mocks, use the apis response
      draft.moviesDisplayed.push(...moviesToDisplayNext);
      draft.isFetching = false;
    })

    setState(newState);
  }

  @Action(MoviesSearchTitle)
  async moviesSearchTitle(
    {getState, setState}: StateContext<MoviesStateModel>,
    action: MoviesSearchTitle) {
    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    });

    setState(newState);
    currentState = newState;

    let filteredMovies = this.allMovies.filter((movie: Movie) => {
      return movie.title.toLowerCase().includes(action.movieTitle);
    });

    //TODO implement api call or can be done also from frontend
    newState = produce(currentState, draft => {
        if (filteredMovies.length < 0) {
          this.toastrService.show('', 'There are no movies that contain ' + action.movieTitle);
        } else {
          draft.allMovies = filteredMovies;
        }
        draft.isFetching = false;
        draft.isFiltered = true;
      }
    );

    setState(newState);
  }

  @Action(MoviesSearchReset)
  async moviesSearchReset(
    {getState, setState}: StateContext<MoviesStateModel>) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);
    currentState = newState;

    newState = produce(currentState, draft => {
      draft.isFetching = false;
      //TODO instead of equal it with mocks, use the apis response
      draft.allMovies = this.allMovies;
      draft.pageSize = this.initialPageSize;
      draft.pageToLoadNext = this.initialPageToLoadNext;
      draft.moviesDisplayed = paginate(this.allMovies, draft.pageSize, draft.pageToLoadNext);
      draft.isFiltered = false;
    })

    setState(newState);
  }


  // @Action(MoviesSearchReset)
  // async moviesSearchReset(
  //   {getState, setState}
  //     :
  //     StateContext<MoviesStateModel>
  // ) {
  //
  //   let currentState = getState();
  //   let newState = produce(currentState, draft => {
  //     draft.isFetching = true;
  //   })
  //
  //   setState(newState);
  //   setState(resetPageState);
  //   currentState = getState();
  //   newState = produce(currentState, draft => {
  //     draft.isFiltered = false;
  //     draft.moviesDisplayed = paginate(this.allMovies, draft.pageSize, draft.pageToLoadNext);
  //   })
  //
  //   setState(newState);
  // }

  @Action(MoviesReset)
  async moviesReset(
    {getState, setState}
      :
      StateContext<MoviesStateModel>
  ) {
    setState(defaultsState);
  }
}
