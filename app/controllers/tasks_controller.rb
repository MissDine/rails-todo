class TasksController < ApplicationController
  # skip_before_action :authorize
    def index
        tasks = Task.all
        render json: tasks
      end
    
      def create
        task = Task.create!(task_params)
        render json: task, status: :created
      end
    
      def update
        task = Task.find_by(id: params[:id])
        task.update(task_params)
        render json: task
      end
    
      def destroy
        task = Task.find_by(id: params[:id])
        task.destroy
        head :no_content
      end
      def show
        task = Task.find_by(id: params[:id])
        render json: task
      end
  #   private route
      private
      
      def task_params
        params.permit(:name, :list_id, :user_id)
      end
end
