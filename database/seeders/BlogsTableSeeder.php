<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BlogsTableSeeder extends Seeder
{
    public function run()
    {
        // Add blog 1
        DB::table('blogs')->insert([
            'title' => 'The Importance of Regular Exercise',
            'image' => 'jpg',
            'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et justo nec nulla tristique venenatis at nec mi. Nulla facilisi. Suspendisse potenti.',
            'author_id' => 1
        ]);

        // Add blog 2
        DB::table('blogs')->insert([
            'title' => 'Healthy Eating Habits for a Better Life',
            'image' => 'jpg',
            'content' => 'Sed ullamcorper vehicula tortor, id vestibulum elit finibus vitae. Fusce sed sodales nisi. Curabitur dignissim tristique sapien, vel feugiat mi tempor vitae.',
            'author_id' => 1
        ]);
    }
}