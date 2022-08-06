class ListsController < ApplicationController
  # skip_before_action :authorize
    def index
        lists = List.all
        render json: lists
      end
    
      def create
        # byebug
        list = List.create(list_params)
        render json: list, status: :created
      end
    
      def update
        list = List.find_by(id: params[:id])
        list.update(list_params)
        render json: list
      end
    
      def destroy
        list = List.find_by(id: params[:id])
        list.destroy
        head :no_content
      end
      def show
        list = List.find_by(id: params[:id])
        render json: list
      end
  #   private route
      private
      
      def list_params
        params.permit(:name, :user_id)
      end
end
