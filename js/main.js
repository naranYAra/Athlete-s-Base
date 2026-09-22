$(function () {
    /*=================================================
    ハンバーガーメニュー
    ===================================================*/
    $(".hamburger").on("click", function () {
        $("header").toggleClass("open");
    });

    // #maskのエリアをクリックした時にメニューを閉じる
    $("#mask").on("click", function () {
        $("header").removeClass("open");
    });

    // リンクをクリックした時にメニューを閉じる
    $("#navi a").on("click", function () {
        $("header").removeClass("open");
    });

    // ×ボタンでメニューを閉じる
    $(".header_nav_close").on("click", function () {
        $("header").removeClass("open");
    });

    /*=================================================
    お問い合わせフォーム：タブ切り替え
    ===================================================*/
    $(".contact_form_tab").on("click", function () {
        const tab = $(this).data("tab");

        // タブのアクティブ状態を切り替え
        $(".contact_form_tab").removeClass("is-active");
        $(this).addClass("is-active");

        // 対応するパネルだけ表示
        $(".contact_form_panel").removeClass("is-active");
        $(`.contact_form_panel[data-panel="${tab}"]`).addClass("is-active");

        // hiddenフィールドに現在の項目を保持
        $("#contact_type").val(tab);

        // お問い合わせ内容の必須/任意ラベルを切り替え（予約タブのみ任意）
        if (tab === "reserve") {
            $("[data-message-required]").hide();
            $("[data-message-optional]").show();
            $("#message").prop("required", false);
        } else {
            $("[data-message-required]").show();
            $("[data-message-optional]").hide();
            $("#message").prop("required", true);
        }
    });

    /*=================================================
    症状のある部位：チップの複数選択
    ===================================================*/
    $(".contact_form_chip").on("click", function () {
        $(this).toggleClass("is-active");

        // 選択中のチップのテキストをhiddenフィールドにカンマ区切りで格納
        const selected = $(".contact_form_chip.is-active")
            .map(function () {
                return $(this).text();
            })
            .get()
            .join(",");
        $("#symptom_parts").val(selected);
    });

    /*=================================================
    スムーススクロール
    ===================================================*/
    // ページ内のリンクをクリックした時に動作する
    $('a[href^="#"]').click(function () {
        // クリックしたaタグのリンクを取得
        let href = $(this).attr("href");
        // ジャンプ先のid名をセット hrefの中身が#もしくは空欄なら,htmlタグをセット
        let target = $(href == "#" || href == "" ? "html" : href);
        // ページトップからジャンプ先の要素までの距離を取得
        let position = target.offset().top;
        // animateでスムーススクロールを行う ページトップからpositionだけスクロールする
        // 600はスクロール速度で単位はミリ秒 swingはイージングのひとつ
        $("html, body").animate({ scrollTop: position }, 600, "swing");
        // urlが変化しないようにfalseを返す
        return false;
    });

    /*=================================================
    fadein（スクロールで要素をフェードイン表示）
    ===================================================*/
    // ページ読み込み時に一度だけ実行（初期表示分のfadeinを反映）
    checkFadein();

    $(window).on("scroll", function () {
        checkFadein();
    });

    function checkFadein() {
        $(".fadein").each(function () {
            // スクロールした距離
            let scroll = $(window).scrollTop();
            // fadeinクラスの要素までの距離
            let target = $(this).offset().top;
            // 画面の高さ
            let windowHeight = $(window).height();
            // fadeinクラスの要素が画面下にきてから200px通過したタイミングで要素を表示
            if (scroll > target - windowHeight + 200) {
                $(this).css("opacity", "1");
                $(this).css("transform", "translateY(0)");
            }
        });
    }
});
