class List < ApplicationRecord
    belongs_to :user
    has_many :tasks

    # validates :tasks, presence: true
    # validates :user_id, presence: true
    # validates :user_id, uniqueness: true
end
