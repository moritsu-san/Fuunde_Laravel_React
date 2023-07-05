<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ThreadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'body' => 'required|max:50'
        ];
    }

    public function messages()
    {
        return [
            'body.required' => 'お題を入力してください',
            'body.max:50' => '50文字以下にしてください'
        ];
    }

    public function attributes()
    {
        return [
            'body' => 'お題',
        ];
    }
}
