<?php

beforeEach(function () {
    $this->withoutVite();
});

test('returns a successful response', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
});
