<?php

use App\Providers\AppServiceProvider;

it('forces https urls in production', function () {
    $this->app['env'] = 'production';

    (new AppServiceProvider($this->app))->boot();

    expect(route('login'))->toStartWith('https://');
});

it('keeps http urls outside production', function () {
    (new AppServiceProvider($this->app))->boot();

    expect(route('login'))->toStartWith('http://');
});
