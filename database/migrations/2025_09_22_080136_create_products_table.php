<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product');
            $table->text('description');
            $table->decimal('price', 8, 2);
            $table->integer('stock');
            $table->boolean('isPinned');
            $table->string('image_main');
            $table->string('image_rear')->nullable();
            $table->string('image_left')->nullable();
            $table->string('image_right')->nullable();
            $table->foreignId('color_id')->constrained('colors');
            $table->foreignId('productcategory_id')->constrained('product_categories');
            $table->foreignId('promotion_id')->nullable()->constrained('promotions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
