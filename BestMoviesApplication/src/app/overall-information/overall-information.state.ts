import {Movie} from "../../model/movie";
import {Person} from "../../model/person";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {
  OverAllInformationFetchBestMoviesTop,
  OverAllInformationFetchInfo, OverAllInformationFetchMoviesFromSameYear, OverAllInformationFetchSameRatingRange,
  OverAllInformationReset
} from "./overall-information.actions";
import {current, produce} from "immer";
import {moviesMock} from "../../util/mocks/movies_mock";
import {peopleMock} from "../../util/mocks/people_mock";
import {NbToastrService} from "@nebular/theme";
import {MoviesService} from "src/api/movies/movies.service";

export interface OverAllInformationStateModel {
  isFetching: boolean;
  moviesByYearIsFiltered: boolean;
  movies: Movie[];
  people: Person[];
  topMovies: Movie[];
  topMoviesByRating: Movie[];
  topMoviesByYear: Movie[];
}

export const defaultsState: OverAllInformationStateModel = {
  isFetching: false,
  moviesByYearIsFiltered: false,
  movies: [],
  people: [],
  topMovies: [],
  topMoviesByRating: [],
  topMoviesByYear: [],
}

@State<OverAllInformationStateModel>( {
  name: 'overallInformationPage',
  defaults: defaultsState,
})

@Injectable()
export class OverAllInformationState {
  movies: Movie[] = [];
  people: Person[] = [];

  constructor(
    private nbToastrService: NbToastrService,
    private moviesService: MoviesService,
    //here the services used for getting date from backend are imported
  ) {
  }

  @Action(OverAllInformationFetchInfo)
  async overAllInformationFetchInfo(
    { getState, setState }: StateContext<OverAllInformationStateModel>,
    action: OverAllInformationFetchInfo) {

    let currentState = getState();

    let newState = produce(currentState, draft => {
      draft.isFetching = true;
    })

    setState(newState);
    currentState = newState;

    // here we will call the API, but for now we have the mocks
    //TODO implement api call
    try {
      this.movies = moviesMock;
      this.people = peopleMock;
    }
    catch (e) {
      this.nbToastrService.show('Error...', 'Fetching overall information went wrong.', { status: 'danger'});
    }

    newState = produce(currentState, draft => {
      draft.isFetching = false;
      //TODO instead of equal it with mocks, use the apis response
      draft.movies = this.movies;
      draft.people = this.people;
    })

    setState(newState);
    currentState = newState;
  }

  @Action(OverAllInformationFetchBestMoviesTop)
  async mverAllInformationFetchBestMoviesTop(
    {getState, setState}: StateContext<OverAllInformationStateModel>,
    action: OverAllInformationFetchBestMoviesTop) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let topMovies: Movie[] = [];
    try {

      //mock
      // topMovies.push(moviesMock[4],moviesMock[5],moviesMock[6], moviesMock[7]);

      //real data
      let movies = await this.moviesService.getNMostPopularMovies(action.top);
      topMovies.push(...movies);
    } catch (e) {

    }

    newState = produce(getState(), draft => {
      draft.topMovies = topMovies;
      draft.isFetching = false;
    })
    setState(newState);
  }

  @Action(OverAllInformationFetchSameRatingRange)
  async overAllInformationFetchSameRatingRange(
    {getState, setState}: StateContext<OverAllInformationStateModel>,
    action: OverAllInformationFetchSameRatingRange) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let topMoviesByRating: Movie[] = [];
    try {

      //mock
      // topMoviesByRating.push(moviesMock[1],moviesMock[2], moviesMock[3], moviesMock[9],moviesMock[10]);

      //real data
      console.log(action.rating);
      if (!action.rating) {
        newState = produce(getState, draft => {
          draft.isFetching = false;
        })

        setState(newState);
        return this.nbToastrService.show(
          "Rating is not found",
          "Couldn't fetch information about movies from same rating",
          {
            status: "warning"
          }
        );
      }
      let movies = await this.moviesService.getNMoviesByRating(action.rating, action.listSize);
      topMoviesByRating.push(...movies);
    } catch (e) {

    }

    newState = produce(getState(), draft => {
      draft.topMoviesByRating = topMoviesByRating;
      draft.isFetching = false;
    })
    setState(newState);
  }

  @Action(OverAllInformationFetchMoviesFromSameYear)
  async overAllInformationFetchMoviesFromSameYear(
    {getState, setState}: StateContext<OverAllInformationStateModel>,
    action: OverAllInformationFetchMoviesFromSameYear) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    let topMoviesByYear: Movie[] = [];
    try {

      //mock
      // topMoviesByYear.push(moviesMock[1], moviesMock[2], moviesMock[3], moviesMock[4]);

      //real data
      if (!action.year) {
        newState = produce(getState, draft => {
          draft.isFetching = false;
        })
        return this.nbToastrService.show(
          "Movie is not found",
          "Couldn't fetch information about movies from same year",
          {
            status: "warning"
          }
        );
      }
      let movies = await this.moviesService.getNMoviesByYear(action.year, action.listSize);
      topMoviesByYear.push(...movies);
    } catch (e) {

    }
    newState = produce(getState(), draft => {
      draft.topMoviesByYear = topMoviesByYear;
      draft.isFetching = false;
    })
    setState(newState);
  }

  @Action(OverAllInformationReset)
  async overAllInformationReset(
    { getState, setState }: StateContext<OverAllInformationStateModel>,
    action: OverAllInformationReset) {
    setState(defaultsState);
  }

}
