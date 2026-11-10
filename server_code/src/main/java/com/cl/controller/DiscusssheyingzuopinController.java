package com.cl.controller;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.*;
import java.lang.*;
import java.math.*;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import com.cl.utils.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.cl.annotation.IgnoreAuth;
import com.cl.annotation.SysLog;

import com.cl.entity.DiscusssheyingzuopinEntity;
import com.cl.entity.view.DiscusssheyingzuopinView;

import com.cl.service.DiscusssheyingzuopinService;
import com.cl.service.TokenService;

/**
 * 摄影作品评论表
 * 后端接口
 * @author 
 * @email 
 * @date 2026-03-12 19:47:42
 */
@RestController
@RequestMapping("/discusssheyingzuopin")
public class DiscusssheyingzuopinController {
    @Autowired
    private DiscusssheyingzuopinService discusssheyingzuopinService;









    /**
     * 后台列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,DiscusssheyingzuopinEntity discusssheyingzuopin,
                                                                                                                                                                                        HttpServletRequest request){
                                    EntityWrapper<DiscusssheyingzuopinEntity> ew = new EntityWrapper<DiscusssheyingzuopinEntity>();
                                                                                                                                                                                                                                                                                            
        
        
        PageUtils page = discusssheyingzuopinService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, discusssheyingzuopin), params), params));
        Map<String, String> deSens = new HashMap<>();
                                                                                                                                                                                                                                            //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(page,deSens);
        return R.ok().put("data", page);
    }







    /**
     * 前端列表
     */
	@IgnoreAuth
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params,DiscusssheyingzuopinEntity discusssheyingzuopin,
		HttpServletRequest request){
        EntityWrapper<DiscusssheyingzuopinEntity> ew = new EntityWrapper<DiscusssheyingzuopinEntity>();

		PageUtils page = discusssheyingzuopinService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, discusssheyingzuopin), params), params));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(page,deSens);
        return R.ok().put("data", page);
    }

	/**
     * 列表
     */
    @RequestMapping("/lists")
    public R list( DiscusssheyingzuopinEntity discusssheyingzuopin){
       	EntityWrapper<DiscusssheyingzuopinEntity> ew = new EntityWrapper<DiscusssheyingzuopinEntity>();
      	ew.allEq(MPUtil.allEQMapPre( discusssheyingzuopin, MPUtil.camelToSnake("discusssheyingzuopin")));
        return R.ok().put("data", discusssheyingzuopinService.selectListView(ew));
    }

	 /**
     * 查询
     */
    @RequestMapping("/query")
    public R query(DiscusssheyingzuopinEntity discusssheyingzuopin){
        EntityWrapper< DiscusssheyingzuopinEntity> ew = new EntityWrapper< DiscusssheyingzuopinEntity>();
 		ew.allEq(MPUtil.allEQMapPre( discusssheyingzuopin, MPUtil.camelToSnake("discusssheyingzuopin")));
		DiscusssheyingzuopinView discusssheyingzuopinView =  discusssheyingzuopinService.selectView(ew);
		return R.ok("查询摄影作品评论表成功").put("data", discusssheyingzuopinView);
    }
	
    /**
     * 后端详情
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id){
        DiscusssheyingzuopinEntity discusssheyingzuopin = discusssheyingzuopinService.selectById(id);
		discusssheyingzuopin = discusssheyingzuopinService.selectView(new EntityWrapper<DiscusssheyingzuopinEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(discusssheyingzuopin,deSens);
        return R.ok().put("data", discusssheyingzuopin);
    }

    /**
     * 前端详情
     */
	@IgnoreAuth
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id){
        DiscusssheyingzuopinEntity discusssheyingzuopin = discusssheyingzuopinService.selectById(id);
		discusssheyingzuopin = discusssheyingzuopinService.selectView(new EntityWrapper<DiscusssheyingzuopinEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(discusssheyingzuopin,deSens);
        return R.ok().put("data", discusssheyingzuopin);
    }
    



    /**
     * 后端保存
     */
    @RequestMapping("/save")
    @SysLog("新增摄影作品评论表")
    public R save(@RequestBody DiscusssheyingzuopinEntity discusssheyingzuopin, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(discusssheyingzuopin);
        discusssheyingzuopinService.insert(discusssheyingzuopin);
        return R.ok().put("data",discusssheyingzuopin.getId());
    }
    
    /**
     * 前端保存
     */
    @SysLog("新增摄影作品评论表")
    @RequestMapping("/add")
    public R add(@RequestBody DiscusssheyingzuopinEntity discusssheyingzuopin, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(discusssheyingzuopin);
        discusssheyingzuopinService.insert(discusssheyingzuopin);
        return R.ok();
    }
     /**
     * 获取用户密保
     */
    @RequestMapping("/security")
    @IgnoreAuth
    public R security(@RequestParam String username){
        DiscusssheyingzuopinEntity discusssheyingzuopin = discusssheyingzuopinService.selectOne(new EntityWrapper<DiscusssheyingzuopinEntity>().eq("", username));
        return R.ok().put("data", discusssheyingzuopin);
    }


    /**
     * 修改
     */
    @RequestMapping("/update")
    @Transactional
    @IgnoreAuth
    public R update(@RequestBody DiscusssheyingzuopinEntity discusssheyingzuopin, HttpServletRequest request){
        //ValidatorUtils.validateEntity(discusssheyingzuopin);
        discusssheyingzuopinService.updateById(discusssheyingzuopin);//全部更新
        return R.ok();
    }



    

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @SysLog("删除摄影作品评论表")
    public R delete(@RequestBody Long[] ids){
        discusssheyingzuopinService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }

    	
	/**
     * 前端智能排序
     */
	@IgnoreAuth
    @RequestMapping("/autoSort")
    public R autoSort(@RequestParam Map<String, Object> params,DiscusssheyingzuopinEntity discusssheyingzuopin, HttpServletRequest request,String pre){
        EntityWrapper<DiscusssheyingzuopinEntity> ew = new EntityWrapper<DiscusssheyingzuopinEntity>();
        Map<String, Object> newMap = new HashMap<String, Object>();
        Map<String, Object> param = new HashMap<String, Object>();
		Iterator<Map.Entry<String, Object>> it = param.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry<String, Object> entry = it.next();
			String key = entry.getKey();
			String newKey = entry.getKey();
			if (pre.endsWith(".")) {
				newMap.put(pre + newKey, entry.getValue());
			} else if (StringUtils.isEmpty(pre)) {
				newMap.put(newKey, entry.getValue());
			} else {
				newMap.put(pre + "." + newKey, entry.getValue());
			}
		}
		params.put("sort", "clicktime");
        params.put("order", "desc");
		PageUtils page = discusssheyingzuopinService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, discusssheyingzuopin), params), params));
        return R.ok().put("data", page);
    }








}
