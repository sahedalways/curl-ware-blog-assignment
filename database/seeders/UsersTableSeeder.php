<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Add admin user
        DB::table('users')->insert([
            'name' => 'Mr Admin',
            'email' => 'admin@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('12345678'),
            'user_type' => 'admin',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // Add regular user
        DB::table('users')->insert([
            'name' => 'Mr User',
            'email' => 'user@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('12345678'),
            'user_type' => 'user',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}