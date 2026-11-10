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

import com.cl.entity.BiaoqianEntity;
import com.cl.entity.view.BiaoqianView;

import com.cl.service.BiaoqianService;
import com.cl.service.TokenService;

/**
 * 标签
 * 后端接口
 * @author 
 * @email 
 * @date 2026-03-12 19:47:40
 */
@RestController
@RequestMapping("/biaoqian")
public class BiaoqianController {
    @Autowired
    private BiaoqianService biaoqianService;









    /**
     * 后台列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,BiaoqianEntity biaoqian,
                                            HttpServletRequest request){
                                    EntityWrapper<BiaoqianEntity> ew = new EntityWrapper<BiaoqianEntity>();
                                                        
        
        
        PageUtils page = biaoqianService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, biaoqian), params), params));
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
    public R list(@RequestParam Map<String, Object> params,BiaoqianEntity biaoqian,
		HttpServletRequest request){
        EntityWrapper<BiaoqianEntity> ew = new EntityWrapper<BiaoqianEntity>();

		PageUtils page = biaoqianService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, biaoqian), params), params));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(page,deSens);
        return R.ok().put("data", page);
    }

	/**
     * 列表
     */
    @RequestMapping("/lists")
    public R list( BiaoqianEntity biaoqian){
       	EntityWrapper<BiaoqianEntity> ew = new EntityWrapper<BiaoqianEntity>();
      	ew.allEq(MPUtil.allEQMapPre( biaoqian, MPUtil.camelToSnake("biaoqian")));
        return R.ok().put("data", biaoqianService.selectListView(ew));
    }

	 /**
     * 查询
     */
    @RequestMapping("/query")
    public R query(BiaoqianEntity biaoqian){
        EntityWrapper< BiaoqianEntity> ew = new EntityWrapper< BiaoqianEntity>();
 		ew.allEq(MPUtil.allEQMapPre( biaoqian, MPUtil.camelToSnake("biaoqian")));
		BiaoqianView biaoqianView =  biaoqianService.selectView(ew);
		return R.ok("查询标签成功").put("data", biaoqianView);
    }
	
    /**
     * 后端详情
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id){
        BiaoqianEntity biaoqian = biaoqianService.selectById(id);
		biaoqian = biaoqianService.selectView(new EntityWrapper<BiaoqianEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(biaoqian,deSens);
        return R.ok().put("data", biaoqian);
    }

    /**
     * 前端详情
     */
	@IgnoreAuth
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id){
        BiaoqianEntity biaoqian = biaoqianService.selectById(id);
		biaoqian = biaoqianService.selectView(new EntityWrapper<BiaoqianEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(biaoqian,deSens);
        return R.ok().put("data", biaoqian);
    }
    



    /**
     * 后端保存
     */
    @RequestMapping("/save")
    @SysLog("新增标签")
    public R save(@RequestBody BiaoqianEntity biaoqian, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(biaoqian);
        biaoqianService.insert(biaoqian);
        return R.ok().put("data",biaoqian.getId());
    }
    
    /**
     * 前端保存
     */
    @SysLog("新增标签")
    @RequestMapping("/add")
    public R add(@RequestBody BiaoqianEntity biaoqian, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(biaoqian);
        biaoqianService.insert(biaoqian);
        return R.ok();
    }


    /**
     * 修改
     */
    @RequestMapping("/update")
    @Transactional
    @SysLog("修改标签")
    public R update(@RequestBody BiaoqianEntity biaoqian, HttpServletRequest request){
        //ValidatorUtils.validateEntity(biaoqian);
        biaoqianService.updateById(biaoqian);//全部更新
        return R.ok();
    }



    

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @SysLog("删除标签")
    public R delete(@RequestBody Long[] ids){
        biaoqianService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }

    	








}
