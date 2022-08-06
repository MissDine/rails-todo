Rails.application.routes.draw do
  resources :lists, only: [:index, :show, :create]
  resources :users, only: [:create, :show, :index] 
  resources :tasks, only: [:create, :show, :index, :destroy]

  post '/login',    to: 'sessions#create'
  post '/logout',   to: 'sessions#destroy'
  get '/logged-in', to: 'sessions#is_logged_in?'
  post '/signin',    to: 'users#create'

  # post '/users',         to: 'users#create'
  # get '/users/:user_id', to: 'users#show'
  # get '/users',          to: 'users#index'
  # patch "/tasks/${task.user_id}", to: "tasks#update"
  # delete "/tasts/${task.user_id}", to: "tasks#destroy"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
