class ListSerializer < ActiveModel::Serializer
  attributes :name, :user_id, :id
  belongs_to :user
  has_many :tasks
end
