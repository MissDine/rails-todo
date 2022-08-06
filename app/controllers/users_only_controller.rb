class UsersOnlyController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  # before_action :authorize

  def index
    tasks = Task.where(users_only: true).includes(:user).order(created_at: :desc)
    render json: articles, each_serializer: ArticleListSerializer
  end

  def show
    task = Task.find(params[:id])
    render json: task
  end
  def create
    user = User.create!(user_params)
    render json: user, status: :created
  end

  def update
    user = User.find_by(id: params[:id])
    user.update(user_params)
    render json: user
  end

  def destroy
    user = User.find_by(id: params[:id])
    user.destroy
    head :no_content
  end

  private

  def record_not_found
    render json: { error: "Task not found" }, status: :not_found
  end

  def authorize
    render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end
  private
      
      
      def user_params
        params.permit(:name, :password)
      end

end
