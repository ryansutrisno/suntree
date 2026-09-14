<?php

it('treats requests forwarded as https by a proxy as secure', function () {
    $response = $this->withHeaders([
        'X-Forwarded-Proto' => 'https',
        'X-Forwarded-For' => '203.0.113.10',
        'X-Forwarded-Host' => 'suntree.trazmedia.com',
    ])->get('/dashboard');

    $response->assertRedirect();

    expect($response->headers->get('Location'))->toStartWith('https://');
});

it('keeps requests insecure when no proxy forwards https', function () {
    $response = $this->get('/dashboard');

    $response->assertRedirect();

    expect($response->headers->get('Location'))->toStartWith('http://');
});
