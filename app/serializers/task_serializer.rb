class TaskSerializer < ActiveModel::Serializer
  attributes :name, :list_id, :user_id, :id
  belongs_to :list
end
