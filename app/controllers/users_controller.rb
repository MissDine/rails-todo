

class UsersController < ApplicationController
    def index
      @users = User.all
         if @users
            render json: {
            users: @users
         }
        else
            render json: {
            status: 500,
            errors: ['no users found']
        }
       end
    end
    def show
      if session[:user_id]
        user = User.find(session[:user_id])
        render json: user
      else
        render json: {error: "Not aothorized"}, status: :unauthorized
      end
    end
    
    def create
       user = User.new(user_params)
        if user.valid? && params[:password] == params[:password_confirmation]
            user.save!
            session[:user_id] = user.id
            render json: user, status: :created
        else 
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
          end
    end
private
    
   def user_params
       params.permit(:name, :password, :password_confirmation, :email)
   end
end