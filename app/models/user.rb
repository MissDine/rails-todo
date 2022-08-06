class User < ApplicationRecord
    has_many :lists
    has_many :tasks, through: :lists
    has_secure_password

    validates :name, presence: true
    validates :name, uniqueness: true
end
