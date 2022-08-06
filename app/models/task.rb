class Task < ApplicationRecord
    belongs_to :user
    belongs_to :list

    # validates :list_id, presence: true
    # validates :user_id, presence: true
    # validates :name, presence: true
    
end