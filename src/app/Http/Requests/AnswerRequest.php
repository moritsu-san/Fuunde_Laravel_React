<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnswerRequest extends FormRequest
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
            'body' => 'required|max:30'
        ];

    }

    public function messages()
    {
        return [
            'body.required' => 'アンサーを入力してください',
            'body.max:30' => '30文字以下にしてください'
        ];

    }

    public function attributes()
    {
        return [
            'body' => 'アンサー',
        ];
    }
}
