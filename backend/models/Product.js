const supabase = require('../config/supabaseConfig');

async function fetchAllTags(offset, limit) {
    const { data, error } = await supabase.rpc('fetch_distinct_tags', {
        limit_val: limit,
        offset_val: offset,
    });

    if (error) {
        console.error('Error fetching tags:', error.message);
        throw error;
    }

    // console.log('Returning from fetchAllTags:', data);
    return data;
}

async function fetchProductsByTagsAndMovies(
    tags,
    movies,
    limit,
    offset,
    sortType
) {
    // Prepare the parameters, ensuring empty arrays are correctly formatted
    const tagNames = tags.length > 0 ? tags : null;
    const movieTitles = movies.length > 0 ? movies : null;
    const sortTypeUsed = sortType || 'name_asc';

    // Call the stored procedure
    const { data, error } = await supabase.rpc(
        'fetch_products_by_tags_movies_and_sort',
        {
            tag_names: tagNames,
            movie_titles: movieTitles,
            limit_val: limit,
            offset_val: offset,
            sort_type: sortTypeUsed,
        }
    );

    if (error) {
        console.error('Error fetching products:', error.message);
        throw error;
    }

    // console.log('Returning from fetchProductsByTagsAndMovies:', data);
    return data;
}

async function getProductRatingInfo(productId, userId = null) {
    const { data, error } = await supabase.rpc('get_product_rating_info', {
        pid: productId,
        uid: userId,
    });

    if (error) {
        console.error('Error fetching product rating info:', error);
        throw error;
    }

    // console.log('Returning from getProductRatingInfo:', data[0]);
    return data[0];
}

async function fetchProductDetails(productId) {
    const { data, error } = await supabase.rpc('fetch_product_details', {
        pid: productId,
    });

    if (error || data.length > 1) {
        console.error('Error fetching product details:', error);
        throw error;
    }

    if (data.length === 0) {
        console.error('No product found with the given ID:', productId);
        return null;
    }

    // console.log('Returning from fetchProductDetails', data[0]);
    return data[0];
}

async function fetchProductFeatures(productId) {
    const { data, error } = await supabase
        .from('product')
        .select('features')
        .eq('id', productId);

    if (error || data.length > 1) {
        console.error('Error fetching product features:', error);
        throw error;
    }

    if (data.length === 0) {
        console.error('No product found with the given ID:', productId);
        return null;
    }

    // console.log('Returning from fetchProductFeatures:', data[0].features);
    return data[0].features;
}

async function fetchProductTags(productId, offset, limit) {
    const { data, error } = await supabase
        .from('product_has_tags')
        .select('name')
        .eq('product_id', productId)
        .range(offset, offset + limit - 1)
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching product tags:', error);
        throw error;
    }

    // const tags = data.map((tag) => tag.tag_name);
    // console.log('Returning from fetchProductTags:', data);
    return data;
}

async function isAddedToWishlist(productId, userId) {
    const { data, error } = await supabase
        .from('user_wishes_product')
        .select('id')
        .eq('product_id', productId)
        .eq('user_id', userId);

    if (error || data.length > 1) {
        console.error('Error fetching wishlist:', error);
        throw error;
    }

    // console.log('Returning from isAddedToWishlist:', data.length === 1);

    return data.length === 1;
}

async function addProductToWishlist(productId, userId) {
    const { data, error } = await supabase
        .from('user_wishes_product')
        .insert({ product_id: productId, user_id: userId })
        .select('id');

    if (error) {
        console.error('Error adding to wishlist:', error);
        throw error;
    }

    // console.log('Returning from addProductToWishlist:', data);
    return data.length === 1;
}

async function removeProductFromWishlist(productId, userId) {
    const { data, error } = await supabase
        .from('user_wishes_product')
        .delete()
        .eq('product_id', productId)
        .eq('user_id', userId)
        .select('id');

    if (error) {
        console.error('Error removing from wishlist:', error);
        throw error;
    }

    // console.log('Returning from removeFromWishlist:', data);
    return data.length === 1;
}

async function fetchProductImages(productId, offset, limit) {
    const { data, error } = await supabase
        .from('product_has_images')
        .select('image_url, caption')
        .eq('product_id', productId)
        .range(offset, offset + limit - 1);

    if (error) {
        console.error('Error fetching product images:', error);
        throw error;
    }

    // const images = data.map((img) => img.url);
    // console.log('Returning from fetchProductImages:', data);
    return data;
}

module.exports = {
    fetchAllTags,
    fetchProductsByTagsAndMovies,
    getProductRatingInfo,
    fetchProductDetails,
    fetchProductFeatures,
    fetchProductTags,
    isAddedToWishlist,
    addProductToWishlist,
    removeProductFromWishlist,
    fetchProductImages,
};
